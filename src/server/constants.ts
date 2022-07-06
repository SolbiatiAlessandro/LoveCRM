export abstract class DATA {
	public static readonly NOTE_PATH = "markdown/";
	public static readonly IMAGE_PATH = "imgs/";
	public static readonly GRAPH_PATH = "./data/";
}

export enum ENDPOINTS {
	LOAD_GRAPH = "/load-graph",
	CREATE_UNCURATED_NOTE = "/create-uncurated-note",
	CREATE_CURATED_NOTE = "/create-curated-note",
	REFERENCE_CURATED_NOTE = "/reference-note",
	EDIT_NOTE = "/edit-note",
	CREATE_PERSON = "/create-person",
	CREATE_FILE = "/create-file",
}

export enum NODE_TYPES {
	CURATED_NOTE = "CURATED_NOTE",
	UNCURATED_NOTE = "UNCURATED_NOTE",
	PERSON = "PERSON",
	PICTURE = "PICTURE",
	FILE = "FILE",
}

// TODO: make enum
export abstract class EVENT_TYPE {
	public static readonly CREATE: string = "CREATE";
	public static readonly OPEN: string = "OPEN";
	public static readonly EDIT: string = "EDIT";
	public static readonly CLOSE: string = "CLOSE";
}

