import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { RESTDataSource } from '@apollo/datasource-rest';

interface Brewery {
  id: string;
  name: string;
  brewery_type: string | null;
  address_1: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  phone: string | null;
  website_url: string | null;
}

class BreweryAPI extends RESTDataSource {
  override baseURL = 'https://api.openbrewerydb.org/v1/';

  async searchBreweries(query: string): Promise<Brewery[]> {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return [];
    }

    return this.get<Brewery[]>('breweries/search', {
      params: {
        query: trimmedQuery,
      },
    });
  }

  async filterBreweries(city: string, type?: string | null): Promise<Brewery[]> {
    const trimmedCity = city.trim();
    const trimmedType = type?.trim();

    if (!trimmedCity) {
      return [];
    }

    return this.get<Brewery[]>('breweries', {
      params: {
        by_city: trimmedCity,
        ...(trimmedType ? { by_type: trimmedType } : {}),
      },
    });
  }
}

const typeDefs = `#graphql
  type Brewery {
    id: ID!
    name: String!
    brewery_type: String
    address_1: String
    city: String
    state: String
    postal_code: String
    country: String
    phone: String
    website_url: String
  }

  type Query {
    search(query: String!): [Brewery!]!
    filter(city: String!, type: String): [Brewery!]!
  }
`;

interface ContextValue {
  dataSources: {
    breweryAPI: BreweryAPI;
  };
}

const resolvers = {
  Query: {
    search: async (_parent: unknown, args: { query: string }, contextValue: ContextValue) => {
      return contextValue.dataSources.breweryAPI.searchBreweries(args.query);
    },
    filter: async (_parent: unknown, args: { city: string; type?: string | null }, contextValue: ContextValue) => {
      return contextValue.dataSources.breweryAPI.filterBreweries(args.city, args.type);
    },
  },
};

const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});

const port = Number(process.env.PORT ?? 4000);

startStandaloneServer(server, {
  listen: { port },
  context: async () => {
    return {
      dataSources: {
        breweryAPI: new BreweryAPI(),
      },
    };
  },
})
  .then(({ url }) => {
    console.log(`GraphQL server ready at ${url}`);
  })
  .catch((error: unknown) => {
    console.error('Failed to start GraphQL server', error);
    process.exit(1);
  });
