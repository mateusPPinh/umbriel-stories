export type SubEditorialProps = {
  id: string;
  title: string;
  slug: string;
  pageBlockId: string | null;
  numberOfArticles: number;
  status: boolean;
  created_at: string;
  updated_at: string;
};


type EditorialsProps = {
  id: string;
  title: string;
  description: string;
  slug: string;
  children: SubEditorialProps[];
  numberOfArticles: number;
  status: boolean;
  created_at: string;
  updated_at: string;
};

export type Editorial = {
  editorials: EditorialsProps[] | null;
};