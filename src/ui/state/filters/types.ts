export type FiltersState = {
	stars: number[];
};

export type FiltersActions = {
	actions: {
		setStars: (stars: number[]) => void;
		resetFilters: () => void;
	};
};
