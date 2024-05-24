declare type CharityInfo = {
  charity: CharityData;
};
declare type CharityData = {
  name: string;
  coverImageUrl: string;
  description: string;
  location: string;
  websiteUrl: string;
  logoUrl: string;
  tags: string[];
  ein: string;
};

declare type NavbarProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

//declare type Tags = {};

declare type AllCharities = {
  nonprofits: CharityData[];
};

declare type User = {
  id: string;
  username: string;
  email: string;
};

declare type Favourite = {
  id: string;
  favourite: string;
  author: User;
};

declare type SignUpValuesType = {
  email: string;
  password: string;
  username: string;
};

declare type LoginValuesType = {
  email: string;
  password: string;
};

declare type UserFavourites = {
  author: User;
  favourite: string;
  _id: string;
};

declare type FavouriteCharity = {
  data: {
    nonprofit: {
      name: string;
      coverImageUrl: string;
      description: string;
      location: string;
      websiteUrl: string;
      logoUrl: string;
      tags: string[];
      ein: string;
    };
  };
};

declare type FundRaiserCreatingData = {
  title: string;
  description: string;
  goal: number;
};

declare type Fundraiser = {
  id: string;
  fundraiser: string;
  author: User;
};
declare type FundraiserData = {
  data: {
    fundraiser: {
      createdAt: string;
      description: string;
      endDate: string;
      goalAmount: string;
      goalCurrency: string;
      startDate: string;
      title: string;
      id: string;
    };
    nonprofits: Nonprofit[];
  };
};

declare type Nonprofit = {
  coverImageCloudinaryId: string;
  name: string;
  id: string;
};
