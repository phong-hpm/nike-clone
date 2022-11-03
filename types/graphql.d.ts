declare module "*.gql" {
  const content: any;
  export default content;
}

declare interface IAggregate {
  aggregate: { count: number };
}
