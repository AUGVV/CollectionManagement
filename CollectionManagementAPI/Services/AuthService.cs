using CollectionManagement.Options;
using CollectionManagement.Services.Constants;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CollectionManagement.Services
{
    public class AuthService : IAuthService
    {
        private readonly JwtCredentialsOptions jwtCredentialsOptions;

        public AuthService(IOptions<JwtCredentialsOptions> jwtCredentialsOptions)
        {
            this.jwtCredentialsOptions = jwtCredentialsOptions.Value;
        }

        public string CreateJwtToken(long userId, bool isRefresh = false)
        {
            var jwt = new JwtSecurityToken(
                issuer: jwtCredentialsOptions.Issuer,
                audience: isRefresh ? "refresh" : jwtCredentialsOptions.Audience,
                claims:
                [
                    new Claim(JwtClaims.Sub, userId.ToString())
                ],
                expires: DateTime.Now.Add(TimeSpan.FromMinutes(
                    isRefresh
                        ? jwtCredentialsOptions.RefreshTokenExpirationMinutes
                        : jwtCredentialsOptions.AccessTokenExpirationMinutes)),
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(jwtCredentialsOptions.Key)),
                        SecurityAlgorithms.HmacSha256));

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public bool ValidateJwtToken(string token, bool isRefresh = false)
        {
            try
            {
                var result = new JwtSecurityTokenHandler()
                    .ValidateToken(token, new TokenValidationParameters
                    {
                        SaveSigninToken = true,
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ClockSkew = TimeSpan.Zero,
                        ValidIssuer = jwtCredentialsOptions.Issuer,
                        ValidAudience = isRefresh ? "refresh" : jwtCredentialsOptions.Audience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtCredentialsOptions.Key))
                    }, out SecurityToken validatedToken);
            }
            catch
            {
                return false;
            }
            return true;
        }

        public long GetTokenUserId(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var tokenParsed = handler.ReadJwtToken(token);
            var userId = tokenParsed?.Claims?.SingleOrDefault(it => it.Type == JwtClaims.Sub)?.Value;
            if (!string.IsNullOrWhiteSpace(userId))
            {
                return Convert.ToInt64(userId);
            }

            return 0;
        }
    }
}
