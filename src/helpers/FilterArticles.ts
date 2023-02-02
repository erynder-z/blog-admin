import { IArticle } from '../interfaces/Article';
import { ITag } from '../interfaces/Tag';

export const filterArticles = (
  filter: ITag | string | null,
  fullArticleList: IArticle[],
  setActiveArticleList: Function
) => {
  let filtered = fullArticleList;

  if (typeof filter === 'string') {
    // search comes from searchbar
    const filterLower = filter.toLowerCase();
    filtered = fullArticleList.filter(
      ({ title, content }) =>
        title.toLowerCase().includes(filterLower) || content.toLowerCase().includes(filterLower)
    );
  } else if (filter) {
    // search comes from tag
    filtered = fullArticleList.filter(({ tags = [] }) =>
      tags.some(({ _id }) => _id === filter._id)
    );
  }

  setActiveArticleList(filtered);
};
