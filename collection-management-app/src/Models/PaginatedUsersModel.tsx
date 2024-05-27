import UserModel from "./UserModel";

class PaginatedUsersModel {
	items: UserModel[];
	total: number;

	constructor(total: number, items: UserModel[]) {
		this.items = items;
		this.total = total;
	}
}

export default PaginatedUsersModel;