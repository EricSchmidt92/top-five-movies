export default interface IMovie {
	id: number;
	title?: string;
	posterPath?: string;
	genres?: string[];
	overview?: string;
	leadingCast?: string[];
	error?: string;
}
