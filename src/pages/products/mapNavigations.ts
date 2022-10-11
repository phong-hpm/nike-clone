const mapNavigations = (navList: INavigation[]) =>
  navList
    // filter all "root" level
    .filter(({ level }) => level === "root")
    .sort((prev, next) => prev.levelOrder - next.levelOrder)
    // get "groups" level for each "root"
    .map((root) => ({
      ...root,
      groups: navList
        // filter all "groups" level which related to "root"
        .filter(({ parentUid }) => parentUid === root.uid)
        .sort((prev, next) => prev.levelOrder - next.levelOrder)
        // get "links" level for each "group"
        .map((group) => {
          return {
            ...group,
            links: navList
              // filter all "links" level which related to "group"
              .filter(({ parentUid }) => parentUid === group.uid)
              .sort((prev, next) => prev.levelOrder - next.levelOrder),
          };
        }),
    }));

export default mapNavigations;
