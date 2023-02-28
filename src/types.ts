export interface ResultPost {
	title: string;
	header_url: string;
	body: string;
	createdAt: {
		nanoseconds: number;
		seconds: number;
	};
	tags: string[];
	id: number;
}
