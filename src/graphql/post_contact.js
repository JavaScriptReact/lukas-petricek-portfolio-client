import { gql } from "@apollo/client";

const graph = gql`
  mutation post_contact(
    $email: String!
    $username: String!
    $message: String!
  ) {
    post_contact(email: $email, username: $username, message: $message) {
      __typename
      id
      email
      message
      username
    }
  }
`;

export default graph;
