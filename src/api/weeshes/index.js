import gql from "graphql-tag";

const add = gql`
  mutation addWeeshForUser($childId: ID, $content: String, $status: Int) {
    addWeeshForUser(childId: $childId, content: $content, status: $status) {
      id
      user {
        id
        username
        firstName
        lastName
        avatarAddress
      }
      content
      status
      updatedAt
    }
  }
`;

const editWeesh = gql`
  mutation editWeeshForUser($weeshId: ID!, $content: String!, $status: Int) {
    editWeeshForUser(weeshId: $weeshId, content: $content, status: $status) {
      id
      user {
        id
        username
        firstName
        lastName
        avatarAddress
      }
      content
      status
      updatedAt
    }
  }
`;

const deleteWeesh = gql`
  mutation deleteWeeshForUser($weeshId: ID!) {
    deleteWeeshForUser(weeshId: $weeshId) {
      id
    }
  }
`;

const undoReweesh = gql`
  mutation undoReweeshForUser($weeshId: ID!) {
    undoReweeshForUser(weeshId: $weeshId) {
      id
    }
  }
`;

const getHomeWeeshes = gql`
  query getHomeWeeshesForUser($limit: Int, $page: Int) {
    getHomeWeeshesForUser(limit: $limit, page: $page) {
      weeshes {
        id
        link
        user {
          id
          username
          firstName
          lastName
          avatarAddress
          label
          unknown {
            fullname
            avatar
          }
        }
        child {
          id
          link
          content
          status
          user {
            id
            username
            firstName
            lastName
            avatarAddress
            label
            unknown {
              fullname
              avatar
            }
          }
        }
        reweesh {
          paginate {
            totalDocs
          }
        }
        isReweeshed {
          id
          link
          user {
            id
            username
          }
          content
          child {
            id
            content
          }
        }
        content
        status
        like {
          paginate {
            totalDocs
          }
        }
        isLiked {
          user {
            id
            username
          }
        }
        isBookmarked {
          user {
            id
            username
          }
        }
        commentsCounter
        updatedAt
        createdAt
      }
      paginate {
        totalDocs
        nextPage
      }
    }
  }
`;

const getShowcase = gql`
  query getTheBestWeeshesForUser($type: String, $limit: Int, $page: Int) {
    getTheBestWeeshesForUser(type: $type, limit: $limit, page: $page) {
      weeshes {
        id
        link
        user {
          id
          username
          firstName
          lastName
          avatarAddress
          label
          unknown {
            fullname
            avatar
          }
        }
        child {
          id
          link
          content
          status
          user {
            id
            username
            firstName
            lastName
            avatarAddress
            label
            unknown {
              fullname
              avatar
            }
          }
        }
        reweesh {
          paginate {
            totalDocs
          }
        }
        isReweeshed {
          id
          link
          user {
            id
            username
          }
          content
          child {
            id
            content
          }
        }
        content
        status
        like {
          paginate {
            totalDocs
          }
        }
        isLiked {
          user {
            id
            username
          }
        }
        isBookmarked {
          user {
            id
            username
          }
        }
        commentsCounter
        updatedAt
        createdAt
      }
      paginate {
        totalDocs
        nextPage
      }
    }
  }
`;

const getWeeshes = gql`
  query getWeeshesForUser($userId: ID!, $limit: Int, $page: Int) {
    getWeeshesForUser(userId: $userId, limit: $limit, page: $page) {
      weeshes {
        id
        link
        user {
          id
          username
          firstName
          lastName
          avatarAddress
          label
          unknown {
            fullname
            avatar
          }
        }
        child {
          id
          link
          content
          status
          user {
            id
            username
            firstName
            lastName
            avatarAddress
            label
            unknown {
              fullname
              avatar
            }
          }
        }
        reweesh {
          paginate {
            totalDocs
          }
        }
        isReweeshed {
          id
          link
          user {
            id
            username
          }
          content
          child {
            id
            content
          }
        }
        commentsCounter
        content
        status
        like {
          paginate {
            totalDocs
          }
        }
        isLiked {
          user {
            id
            username
          }
        }
        isBookmarked {
          user {
            id
            username
          }
        }
        updatedAt
        createdAt
      }
      paginate {
        totalDocs
        nextPage
      }
    }
  }
`;

const getWeeshByLink = gql`
  query getWeeshByLinkForUser($link: String!) {
    getWeeshByLinkForUser(link: $link) {
      id
      link
      user {
        id
        username
        firstName
        lastName
        avatarAddress
        label
        unknown {
          fullname
          avatar
        }
      }
      child {
        id
        link
        content
        status
        user {
          id
          username
          firstName
          lastName
          avatarAddress
          label
          unknown {
            fullname
            avatar
          }
        }
      }
      content
      status
      like {
        paginate {
          totalDocs
        }
      }
      isLiked {
        user {
          id
          username
        }
      }
      reweesh {
        paginate {
          totalDocs
        }
      }
      isReweeshed {
        id
        link
        user {
          id
          username
        }
        content
        child {
          id
          content
        }
      }
      isBookmarked {
        user {
          id
          username
        }
      }
      comment {
        weeshComments {
          id
          user {
            id
            username
            firstName
            lastName
            avatarAddress
            label
            unknown {
              fullname
              avatar
            }
          }
          content
          children {
            weeshComments {
              id
              user {
                id
                username
                firstName
                lastName
                avatarAddress
                label
                unknown {
                  fullname
                  avatar
                }
              }
              like {
                weeshCommentLikes {
                  id
                  user {
                    id
                    username
                  }
                }
                paginate {
                  totalDocs
                }
              }
              isLiked {
                id
                user {
                  id
                  username
                }
              }
              content
              updatedAt
              createdAt
            }
            paginate {
              totalDocs
            }
          }
          like {
            weeshCommentLikes {
              id
              user {
                id
                username
              }
            }
            paginate {
              totalDocs
            }
          }
          isLiked {
            id
            user {
              id
              username
            }
          }
          updatedAt
          createdAt
        }
        paginate {
          totalDocs
        }
      }
      commentsCounter
      updatedAt
      createdAt
    }
  }
`;

export default {
  add,
  editWeesh,
  deleteWeesh,
  undoReweesh,
  getWeeshes,
  getHomeWeeshes,
  getShowcase,
  getWeeshByLink,
};
