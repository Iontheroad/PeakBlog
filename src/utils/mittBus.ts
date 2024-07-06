import mitt, { Emitter } from "mitt";
import type { Article } from "@/api/article";
type MittType = {
  searchArticle: string;
  getCatalogue: {
    list: [];
    article: Article.ArticleItem;
  };
};
const mittBus: Emitter<MittType> = mitt<MittType>();

export default mittBus;
