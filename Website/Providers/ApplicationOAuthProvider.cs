using System;
using System.Threading.Tasks;
using Microsoft.Owin.Security.OAuth;
using System.Security.Claims;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using System.Collections.Generic;
using Microsoft.AspNet.Identity.Owin;
using VDMS.Identity;

namespace VDMS5_MVC.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string _publicClientId;

        public ApplicationOAuthProvider(string publicClientId)
        {
            if (publicClientId == null)
            {
                throw new ArgumentNullException("publicClientId");
            }

            _publicClientId = publicClientId;
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            string clientId = string.Empty;
            string clientSecret = string.Empty;

            if (!context.TryGetBasicCredentials(out clientId, out clientSecret))
            {
                context.TryGetFormCredentials(out clientId, out clientSecret);
            }

            if (context.ClientId == null)
            {
                //Remove the comments from the below line context.SetError, and invalidate context 
                //if you want to force sending clientId/secrects once obtain access tokens. 
                context.Validated();
                //context.SetError("invalid_clientId", "ClientId should be sent.");
                return Task.FromResult<object>(null);
            }

            context.Validated();
            return Task.FromResult<object>(null);
        }

        public override Task ValidateTokenRequest(OAuthValidateTokenRequestContext context)
        {
            return base.ValidateTokenRequest(context);
        }

        public override Task ValidateAuthorizeRequest(OAuthValidateAuthorizeRequestContext context)
        {
            return base.ValidateAuthorizeRequest(context);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _publicClientId)
            {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
                else if (context.ClientId == "web")
                {
                    var expectedUri = new Uri(context.Request.Uri, "/");
                    context.Validated(expectedUri.AbsoluteUri);
                }
            }

            return Task.FromResult<object>(null);
        }
        
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();

            var user = await userManager.FindAsync(context.UserName, context.Password);

            if (user == null)
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.");
                return;
            }

            ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(userManager);
            ClaimsIdentity cookiesIdentity = await user.GenerateUserIdentityAsync(userManager);

            AuthenticationProperties properties = CreateProperties(user.UserName);
            AuthenticationTicket ticket = new AuthenticationTicket(oAuthIdentity, properties);
            context.Validated(ticket);
            context.Request.Context.Authentication.SignIn(cookiesIdentity);
        }

        public static AuthenticationProperties CreateProperties(string userName)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { "userName", userName }
            };
            return new AuthenticationProperties(data);
        }

        public override Task MatchEndpoint(OAuthMatchEndpointContext context)
        {
            return base.MatchEndpoint(context);
        }

        public override Task GrantAuthorizationCode(OAuthGrantAuthorizationCodeContext context)
        {
            return base.GrantAuthorizationCode(context);
        }

        public override Task GrantRefreshToken(OAuthGrantRefreshTokenContext context)
        {
            return base.GrantRefreshToken(context);
        }

        public override Task GrantClientCredentials(OAuthGrantClientCredentialsContext context)
        {
            return base.GrantClientCredentials(context);
        }

        public override Task GrantCustomExtension(OAuthGrantCustomExtensionContext context)
        {
            return base.GrantCustomExtension(context);
        }

        public override Task AuthorizeEndpoint(OAuthAuthorizeEndpointContext context)
        {
            return base.AuthorizeEndpoint(context);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            return base.TokenEndpoint(context);
        }

        public override Task AuthorizationEndpointResponse(OAuthAuthorizationEndpointResponseContext context)
        {
            return base.AuthorizationEndpointResponse(context);
        }

        public override Task TokenEndpointResponse(OAuthTokenEndpointResponseContext context)
        {
            return base.TokenEndpointResponse(context);
        }
    }
}