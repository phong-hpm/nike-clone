export const removeEmptyLayoutCard = (gridList: ILayoutItem[]) => {
  console.log(gridList);

  return gridList.filter((grid) => {
    const rowList = grid.rowList?.filter((row) => {
      const colList = row.colList?.filter((col) => {
        const blockList = col.blockList?.filter((block) => {
          return block.card;
        });

        return blockList?.length;
      });

      return colList?.length;
    });

    return rowList?.length;
  });
};
