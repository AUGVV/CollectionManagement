using CollectionManagement.Services.Constants;

namespace CollectionManagement.Services
{
    public class AuthContext : IAuthContext
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly Lazy<Dictionary<string, IReadOnlyList<string>>> claims;

        public AuthContext(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
            claims = new Lazy<Dictionary<string, IReadOnlyList<string>>>(LoadClaims);
        }

        public long UserId => GetUserId();
        private long GetUserId()
        {
            if(claims.Value.ContainsKey(JwtClaims.Sub))
            {
                var value = claims.Value.GetValueOrDefault(JwtClaims.Sub).FirstOrDefault();
                if (value == null)
                {
                    return 0;
                }
                return Convert.ToInt64(value);
            }
            return 0;
        }


        private Dictionary<string, IReadOnlyList<string>> LoadClaims()
        {
            if (httpContextAccessor.HttpContext.User == null)
            {
                return [];
            }

            return httpContextAccessor.HttpContext.User.Claims
                .GroupBy(it => it.Type)
                .ToDictionary(
                    it => it.Key,
                    group => (IReadOnlyList<string>)group.Select(it => it.Value).ToList());
        }
    }
}
