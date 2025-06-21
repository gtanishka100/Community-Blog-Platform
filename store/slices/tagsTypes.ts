export interface TrendingTag {
  count: number;
  tag: string;
}

export interface TagsState {
  trendingTags: TrendingTag[];
  isLoading: boolean;
  error: string | null;
  selectedTag: string | null;
}