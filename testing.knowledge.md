# Testing Guide for DevVault Kit

## Test Categories

### 1. Authentication Tests
Request format:
```
"Please test the authentication flow for [provider] with the following scenarios:
- Sign up flow
- Sign in flow
- Error handling for [specific error case]
- OAuth integration with [provider]"
```

### 2. Payment Integration Tests
Request format:
```
"Please test the Stripe integration for:
- One-time payment flow for [product type]
- Webhook handling for [event type]
- Error cases for [specific scenario]"
```

### 3. UI Component Tests
Request format:
```
"Please test the [component name] with:
- Different screen sizes: [specify sizes]
- Various user interactions: [list interactions]
- Edge cases: [specific cases]
- Accessibility concerns"
```

### 4. Performance Tests
Request format:
```
"Please test the performance of:
- Page load time for [specific page]
- Animation performance on [device type]
- Build time optimization
- Bundle size analysis"
```

### 5. Integration Tests
Request format:
```
"Please test the integration between:
- Frontend and Convex backend for [feature]
- Authentication and payment flow
- Email service integration
- Third-party service [name]"
```

## Best Practices for Requesting Tests

1. Be Specific:
```
❌ "Test the auth system"
✅ "Test the Google OAuth sign-in flow with both successful and failed scenarios"
```

2. Include Test Cases:
```
"Please test [feature] with these cases:
1. Happy path: [description]
2. Error case: [description]
3. Edge case: [description]"
```

3. Specify Environment:
```
"Test in:
- Development environment
- Production environment
- Mobile devices
- Different browsers"
```

4. Request Performance Metrics:
```
"Please test [feature] and report:
- Load time
- Memory usage
- Network requests
- Bundle size impact"
```

## Example Test Request

Here's a complete example of how to request a comprehensive test:

```
"Please test the Premium Kit purchase flow with:

1. Authentication:
   - Logged in user
   - Anonymous user redirect
   - Session handling

2. Payment Processing:
   - Successful payment
   - Failed payment
   - Webhook handling

3. UI/UX:
   - Mobile responsiveness
   - Loading states
   - Error messages
   - Success feedback

4. Performance:
   - Page load time
   - Payment processing time
   - Database updates

5. Integration:
   - Stripe checkout
   - Email notifications
   - Database updates
   - User dashboard update

Environment: Development
Devices: Desktop and Mobile
Browsers: Chrome, Firefox, Safari"
```

## Testing Tools Available
- Jest for unit testing
- Cypress for E2E testing
- Lighthouse for performance
- React Testing Library for component testing
- Chrome DevTools for performance profiling
