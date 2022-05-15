export abstract class DATA {
	public static readonly NOTE_PATH = "markdown/";
	public static readonly IMAGE_PATH = "imgs/";
	public static readonly GRAPH_PATH = "./data/";
}

export abstract class ENDPOINTS {
	public static readonly LOAD_GRAPH: string = "/load-graph"
	public static readonly CREATE_UNCURATED_NOTE: string = "/create-uncurated-note"
	public static readonly CREATE_CURATED_NOTE: string = "/create-curated-note"
	public static readonly REFERENCE_CURATED_NOTE: string = "/reference-curated-note"
	public static readonly EDIT_NOTE: string = "/edit-note"
	public static readonly CREATE_PERSON: string = "/create-person"
}

// TODO: make enum
export abstract class NODE_TYPES {
	public static readonly CURATED_NOTE: string = "CURATED_NOTE";
	public static readonly UNCURATED_NOTE: string = "UNCURATED_NOTE";
	public static readonly PERSON: string = "PERSON";
	public static readonly PICTURE: string = "PICTURE";
}

// TODO: make enum
export abstract class EVENT_TYPE {
	public static readonly CREATE: string = "CREATE";
	public static readonly OPEN: string = "OPEN";
	public static readonly EDIT: string = "EDIT";
	public static readonly CLOSE: string = "CLOSE";
}

