using CollectionManagement.Exceptions;
using CollectionManagement.Models.Base;
using System.Text.Json;

namespace CollectionManagement.Middleware
{
    public class ExceptionMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch(Exception exception)
            {
                if (exception is FluentValidation.ValidationException ex)
                {
                    context.Response.ContentType = "application/json";
                    context.Response.StatusCode = 400;
                    string text = JsonSerializer.Serialize(ex.Errors.Select(it => new ErrorModel
                    {
                        ErrorName = it.ErrorCode,
                        ErrorDescription = it.ErrorMessage
                    }));
                    await context.Response.WriteAsync(text);
                }
                else if(exception is UnauthorizedException)
                {
                    context.Response.Clear();
                    context.Response.StatusCode = 401;
                }
                else
                {
                    context.Response.Clear();
                    context.Response.StatusCode = 500;
                }
            }
        }
    }
}
