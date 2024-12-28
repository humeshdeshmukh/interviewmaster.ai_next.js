import { Question } from '../../types';

export const securityQuestions: Question[] = [
  {
    id: 9001,
    title: 'Explain JWT Authentication',
    description: 'Describe JWT (JSON Web Token) authentication and its implementation.',
    category: 'Tech',
    company: 'Auth0',
    isBookmarked: false,
    details: `JWT Authentication is a token-based stateless authentication mechanism.

Structure of a JWT:
1. Header (Algorithm & Token Type)
2. Payload (Claims)
3. Signature

Implementation Example:
\`\`\`typescript
// Server-side JWT generation
import jwt from 'jsonwebtoken';

const generateToken = (user: User): string => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  };

  const secret = process.env.JWT_SECRET!;
  const options = {
    expiresIn: '24h',
    algorithm: 'HS256'
  };

  return jwt.sign(payload, secret, options);
};

// Middleware for protecting routes
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Client-side token storage and usage
class AuthService {
  static setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  static getToken(): string | null {
    return localStorage.getItem('token');
  }

  static removeToken(): void {
    localStorage.removeItem('token');
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = jwt.decode(token);
      if (!decoded) return false;
      
      // Check expiration
      const exp = (decoded as any).exp * 1000;
      return Date.now() < exp;
    } catch {
      return false;
    }
  }
}
\`\`\`

Security Considerations:
1. Token Storage
   - Use HttpOnly cookies
   - Never store in localStorage for sensitive apps
   - Consider refresh token pattern

2. CSRF Protection
\`\`\`typescript
app.use(csrf());

// Generate token
app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
\`\`\`

3. XSS Prevention
\`\`\`typescript
// Headers
app.use(helmet());

// Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  })
);
\`\`\`

Best Practices:
1. Short token expiration
2. Secure token transmission
3. Proper error handling
4. Regular security audits
5. Token revocation strategy`
  },
  {
    id: 9002,
    title: 'Implement OAuth 2.0',
    description: 'Explain OAuth 2.0 implementation and best practices.',
    category: 'Tech',
    company: 'Google',
    isBookmarked: false,
    details: `OAuth 2.0 is an authorization framework that enables applications to obtain limited access to user accounts.

Implementation Example:
\`\`\`typescript
// OAuth 2.0 Configuration
const oauthConfig = {
  clientId: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/auth/callback',
  authorizationURL: 'https://provider.com/oauth/authorize',
  tokenURL: 'https://provider.com/oauth/token',
  scope: ['read', 'write']
};

// Authorization URL Generation
const getAuthorizationUrl = () => {
  const params = new URLSearchParams({
    client_id: oauthConfig.clientId,
    redirect_uri: oauthConfig.redirectUri,
    scope: oauthConfig.scope.join(' '),
    response_type: 'code',
    state: generateRandomState()
  });

  return \`\${oauthConfig.authorizationURL}?\${params.toString()}\`;
};

// Token Exchange
async function exchangeCodeForToken(code: string): Promise<TokenResponse> {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: oauthConfig.redirectUri,
    client_id: oauthConfig.clientId,
    client_secret: oauthConfig.clientSecret
  });

  const response = await fetch(oauthConfig.tokenURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  });

  return response.json();
}

// OAuth Callback Handler
app.get('/auth/callback', async (req, res) => {
  try {
    const { code, state } = req.query;
    
    // Verify state to prevent CSRF
    if (state !== req.session.oauthState) {
      throw new Error('Invalid state parameter');
    }

    const tokens = await exchangeCodeForToken(code);
    
    // Store tokens securely
    req.session.accessToken = tokens.access_token;
    req.session.refreshToken = tokens.refresh_token;

    res.redirect('/dashboard');
  } catch (error) {
    res.redirect('/auth/error');
  }
});

// Token Refresh
async function refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: oauthConfig.clientId,
    client_secret: oauthConfig.clientSecret
  });

  const response = await fetch(oauthConfig.tokenURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  });

  return response.json();
}
\`\`\`

Security Best Practices:
1. State Parameter
   - Use cryptographically secure random values
   - Verify state in callback
   - Store state in session

2. Token Storage
   - Use secure HttpOnly cookies
   - Implement proper session management
   - Regular token rotation

3. Error Handling
   - Proper error messages
   - Secure error logging
   - User-friendly error pages

4. Scope Management
   - Request minimal scopes
   - Validate scope access
   - Document scope usage

Flow Diagram:
1. User initiates OAuth flow
2. App redirects to provider
3. User authorizes app
4. Provider redirects with code
5. App exchanges code for tokens
6. App stores tokens securely
7. App uses tokens for API access`
  }
];
