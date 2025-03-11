import MenuItemFragment from '@/app/_components/navigation/MenuItemFragment';
import { MenuItem as GessoMenuItem } from '@/source/03-components/Menu/Menu';
import { FragmentType, getFragmentData } from '@/types/__generated__';
import { MenuItemFragmentFragment } from '@/types/__generated__/graphql';

interface MenuItemFragmentWithUrl extends MenuItemFragmentFragment {
  url: string;
}

function menuItemHasUrl(
  menuItem: MenuItemFragmentFragment,
): menuItem is MenuItemFragmentWithUrl {
  return typeof menuItem.url === 'string';
}

function prepMenuItems(
  items: FragmentType<typeof MenuItemFragment>[] | null | undefined,
): GessoMenuItem[] {
  if (!items) {
    return [];
  }
  return items
    .map(
      (
        menuItem: FragmentType<typeof MenuItemFragment>,
      ): MenuItemFragmentFragment =>
        getFragmentData(MenuItemFragment, menuItem),
    )
    .filter(menuItemHasUrl)
    .map(
      (menuItem): GessoMenuItem => ({
        title: menuItem.title,
        url: menuItem.url.replace('/drupal', ''),
      }),
    );
}

export { menuItemHasUrl, prepMenuItems };
export type { MenuItemFragmentWithUrl };
