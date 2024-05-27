import CollectionModel from "./CollectionModel";

class PaginatedCollectionsModel {
	items: CollectionModel[];
	total: number;

	constructor(total: number, items: CollectionModel[]) {
		this.items = items;
		this.total = total;
	}
}

export default PaginatedCollectionsModel;