import mitt, { Emitter } from "mitt";

type MittType = {
  searchArticle: string;
};
const mittBus: Emitter<MittType> = mitt<MittType>();

export default mittBus;
