export const px2Number = (px: string): number => +px.slice(0, -2);

export const getInnerHeight = (element: Element): number => {
  const borderHeight =
    px2Number(getComputedStyle(element).borderTopWidth) +
    px2Number(getComputedStyle(element).borderBottomWidth);

  const paddingHeight =
    px2Number(getComputedStyle(element).borderTopWidth) +
    px2Number(getComputedStyle(element).borderBottomWidth);
  return element.scrollHeight - borderHeight - paddingHeight;
};
