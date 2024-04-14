using AutoMapper;
using CollectionManagement.Models.Users;
using DataBaseMigrator.Entity.Users;
using DataBaseMigrator.Entity.Users.Types;

namespace CollectionManagement.Mapper
{
    public class UserAutoMapper : Profile
    {
        public UserAutoMapper() {


            CreateMap<User, GetUser>()
                .ForMember(it => it.UserId, m => m.MapFrom(it => it.Id))
                .ForMember(it => it.Nickname, m => m.MapFrom(it => it.Nickname))
                .ForMember(it => it.Email, m => m.MapFrom(it => it.Email))
                .ForMember(it => it.IsVerified, m => m.MapFrom(it => it.IsVerified))
                .ForMember(it => it.CreationDate, m => m.MapFrom(it => it.CreationDate))
                .ForMember(it => it.Language, m => m.MapFrom(it =>
                    it.UserConfig.Single(it => it.ConfigType == ConfigType.Language).Value))
                .ForMember(it => it.Theme, m => m.MapFrom(it =>
                    it.UserConfig.Single(it => it.ConfigType == ConfigType.Theme).Value))
                .ForMember(it => it.Role, m => m.MapFrom(it => 
                    it.UserRoles.Single().Role));
        }
    }
}
