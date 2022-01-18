# Filter Checkbox Component by Mediadesain

Multiple Filter Checkbox Component

```
<filter-checkbox
    class="filter-class"
    Title="Filter by"
    [ListModel] ="data.products"
    [FilterModel]="filterBy"
    [FilteredModel]="filterSelected">
</filter-checkbox>
```


| Attribute | Type | Description |
| -- | -- | -- |
| Title | string | Title Filter |
| [ListModel] | Array | *ngFor item will add filter function |
| [FilterModel] | Object | List Keys from Array will use filter function |
| [FilteredModel] | Object | List Key & Values Selected |
| class | string | Classes for styling |

`Make sure use filter.pipe summarize by mediadesain`