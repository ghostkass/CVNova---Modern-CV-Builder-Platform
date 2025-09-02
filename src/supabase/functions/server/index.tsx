import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Helper function to get user from access token
async function getUser(request: Request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  if (!accessToken) {
    return null;
  }
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return null;
    }
    return user;
  } catch (error) {
    console.log('Error getting user:', error);
    return null;
  }
}

// Auth routes
app.post('/make-server-a189b8f6/auth/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      message: 'User created successfully',
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata.name
      }
    });
  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

// CV routes
app.get('/make-server-a189b8f6/cvs', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const cvs = await kv.getByPrefix(`cv:${user.id}:`);
    
    return c.json({ 
      cvs: cvs.map(cv => ({
        id: cv.key.split(':')[2],
        ...cv.value
      }))
    });
  } catch (error) {
    console.log('Error fetching CVs:', error);
    return c.json({ error: 'Failed to fetch CVs' }, 500);
  }
});

app.post('/make-server-a189b8f6/cvs', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const cvData = await c.req.json();
    const cvId = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    
    const cv = {
      ...cvData,
      id: cvId,
      userId: user.id,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    await kv.set(`cv:${user.id}:${cvId}`, cv);

    return c.json({ 
      message: 'CV created successfully',
      cv 
    });
  } catch (error) {
    console.log('Error creating CV:', error);
    return c.json({ error: 'Failed to create CV' }, 500);
  }
});

app.put('/make-server-a189b8f6/cvs/:id', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const cvId = c.req.param('id');
    const updates = await c.req.json();
    
    const existingCV = await kv.get(`cv:${user.id}:${cvId}`);
    if (!existingCV) {
      return c.json({ error: 'CV not found' }, 404);
    }

    const updatedCV = {
      ...existingCV,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`cv:${user.id}:${cvId}`, updatedCV);

    return c.json({ 
      message: 'CV updated successfully',
      cv: updatedCV 
    });
  } catch (error) {
    console.log('Error updating CV:', error);
    return c.json({ error: 'Failed to update CV' }, 500);
  }
});

app.delete('/make-server-a189b8f6/cvs/:id', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const cvId = c.req.param('id');
    await kv.del(`cv:${user.id}:${cvId}`);

    return c.json({ message: 'CV deleted successfully' });
  } catch (error) {
    console.log('Error deleting CV:', error);
    return c.json({ error: 'Failed to delete CV' }, 500);
  }
});

// Public CV sharing
app.post('/make-server-a189b8f6/cvs/:id/share', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const cvId = c.req.param('id');
    const cv = await kv.get(`cv:${user.id}:${cvId}`);
    
    if (!cv) {
      return c.json({ error: 'CV not found' }, 404);
    }

    const shareId = crypto.randomUUID();
    const shareableCV = {
      ...cv,
      shareId,
      isPublic: true,
      sharedAt: new Date().toISOString()
    };

    await kv.set(`cv:${user.id}:${cvId}`, shareableCV);
    await kv.set(`shared_cv:${shareId}`, {
      cvId,
      userId: user.id,
      sharedAt: new Date().toISOString()
    });

    return c.json({ 
      message: 'CV shared successfully',
      shareUrl: `https://cvnova.com/shared/${shareId}`,
      shareId 
    });
  } catch (error) {
    console.log('Error sharing CV:', error);
    return c.json({ error: 'Failed to share CV' }, 500);
  }
});

app.get('/make-server-a189b8f6/shared/:shareId', async (c) => {
  try {
    const shareId = c.req.param('shareId');
    const sharedCV = await kv.get(`shared_cv:${shareId}`);
    
    if (!sharedCV) {
      return c.json({ error: 'Shared CV not found' }, 404);
    }

    const cv = await kv.get(`cv:${sharedCV.userId}:${sharedCV.cvId}`);
    if (!cv || !cv.isPublic) {
      return c.json({ error: 'CV not available' }, 404);
    }

    // Increment view count
    const viewKey = `cv_views:${shareId}`;
    const currentViews = (await kv.get(viewKey)) || 0;
    await kv.set(viewKey, currentViews + 1);

    return c.json({ 
      cv: {
        ...cv,
        views: currentViews + 1
      }
    });
  } catch (error) {
    console.log('Error fetching shared CV:', error);
    return c.json({ error: 'Failed to fetch shared CV' }, 500);
  }
});

// User preferences
app.get('/make-server-a189b8f6/user/preferences', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const preferences = await kv.get(`user_preferences:${user.id}`) || {
      theme: 'light',
      defaultTemplate: 'modern',
      language: 'fr'
    };

    return c.json({ preferences });
  } catch (error) {
    console.log('Error fetching preferences:', error);
    return c.json({ error: 'Failed to fetch preferences' }, 500);
  }
});

app.put('/make-server-a189b8f6/user/preferences', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const preferences = await c.req.json();
    await kv.set(`user_preferences:${user.id}`, preferences);

    return c.json({ 
      message: 'Preferences updated successfully',
      preferences 
    });
  } catch (error) {
    console.log('Error updating preferences:', error);
    return c.json({ error: 'Failed to update preferences' }, 500);
  }
});

// Analytics
app.get('/make-server-a189b8f6/analytics/:cvId', async (c) => {
  try {
    const user = await getUser(c.req);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const cvId = c.req.param('cvId');
    const cv = await kv.get(`cv:${user.id}:${cvId}`);
    
    if (!cv) {
      return c.json({ error: 'CV not found' }, 404);
    }

    const views = await kv.get(`cv_views:${cv.shareId}`) || 0;
    const downloads = await kv.get(`cv_downloads:${cvId}`) || 0;

    return c.json({
      views,
      downloads,
      lastViewed: cv.lastViewed,
      createdAt: cv.createdAt,
      updatedAt: cv.updatedAt
    });
  } catch (error) {
    console.log('Error fetching analytics:', error);
    return c.json({ error: 'Failed to fetch analytics' }, 500);
  }
});

// Health check
app.get('/make-server-a189b8f6/health', (c) => {
  return c.json({ status: 'OK', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);