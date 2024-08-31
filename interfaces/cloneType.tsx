export type ClonePublic = {
  cloneid: string;
  img: string;
  backgroundImg: string;
  name: string;
  description: string;
  emotion: {
    humor: string;
    empathy: string;
    assertiveness: string;
    intelligence: string;
    optimism: string;
  };
  prompt: string;
};

export type ClonePrivate = {
  cloneid: string;
  img: string;
  backgroundImg: string;
  name: string;
  description: string;
  email: string;
  emotion: {
    humor: string;
    empathy: string;
    assertiveness: string;
    intelligence: string;
    optimism: string;
  };
  prompt: string;
};
