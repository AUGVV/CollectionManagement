using CollectionManagement.Models.Users;
using MediatR;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CollectionManagement.Handlers.Auth
{
    public class LoginHandler
    {
        public class Request : Login, IRequest<string>
        {
        }

        public class Handler : IRequestHandler<Request, string>
        {
            public Handler()
            {
            }

            public async Task<string> Handle(Request request, CancellationToken cancellationToken)
            {

                var jwt = new JwtSecurityToken(
                    issuer: "mr test",
                    audience: "blah",
                    claims: new List<Claim> { new Claim(ClaimTypes.Name, "i dont know i dont care") },
                expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(2)),
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("VNIASDOrtdsjhtaehg4w3yghrsjrtsah554N")), SecurityAlgorithms.HmacSha256));

                return new JwtSecurityTokenHandler().WriteToken(jwt);
            }       
        }
    }
}
