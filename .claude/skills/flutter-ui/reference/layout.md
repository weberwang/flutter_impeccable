Fix Flutter layout, spacing, visual hierarchy, and scroll behavior.

## Check

- Constraints are explicit and stable.
- Row and Column children use Expanded, Flexible, Wrap, or scrolling where needed.
- SafeArea and keyboard insets are handled.
- Scrollables are not nested accidentally.
- Large content uses ListView.builder, GridView.builder, CustomScrollView, or slivers.
- Spacing follows app tokens or clear local rhythm.
- Primary action placement respects thumb reach and platform convention.

Avoid fixed screen dimensions, overflow-prone rows, and using Container when Padding, Align, SizedBox, or DecoratedBox would state intent better.
