export abstract class DATA {
	public static readonly NOTE_PATH = "markdown/";
	public static readonly IMAGE_PATH = "imgs/";
	public static readonly GRAPH_PATH = "./data/";
}

export abstract class ENDPOINTS {
	public static readonly CREATE_UNCURATED_NOTE: string = "/create-uncurated-note"
	public static readonly CREATE_CURATED_NOTE: string = "/create-curated-note"
}

export abstract class NODE_TYPES {
	public static readonly NOTE: string = "_note";
}