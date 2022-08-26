## Flow

### Description

The flow component comprises of three parts
1. Flow List - a virtual scroller than render a large number of elements as a table
2. Flow Sidebar - a sidebar on the right side that can be used to render additional information
3. Flow Console - a console which can run actions on any of the flowlist items.

### Props

| Property | Type     | Default | Required | Description |
| -------- | -------  | ------- | -------- | ----------- |
| name   | String | |          | Name of the flow|
| items    | Array  |    |    true      | Array of objects to be rendered |
| headers    | Array   |         |   true       | Array of objects where each item represents a column, see header config section for more detauls|
| config  | Object |     |    true      | Configuration options for the flow, see flow config section for details |
| actions  | Arrat |     |    true      | List of actions to be passed on the console, see console config section for more |

#### flow  configuration
Each item in the headers array can have the below

| Property | Type     | Default | Required | Description |
| -------- | -------  | ------- | -------- | ----------- |
| name   | String | |         | Name of the flow |
| keyField   | String | |     true    | Unique identifier field for the items |
| itemSize   | Number | |     true    | Size of the row in pixels |
| showSidebar   | Boolean | |         | Show/Hide sidebar |


#### headers (column) configuration
Each item in the headers array can have the below properties

| Property | Type     | Default | Required | Description |
| -------- | -------  | ------- | -------- | ----------- |
| key   | String | |     true     | Field to be used from the item object as a column|
| label   | String | |           | Header text on the column, if not provided key will be used |
| template   | String | |           | Optional template which will be rendered if provided. Use the object 'option' to access the item properties within the template |
| size   | Number | |           | relative size that the giver column should occupu ex: 0.2, 0.5, 0.8, 1  |
| show   | Boolean | true |           | Show/hide the column  |
| sortable   | Boolean | true |           | If true, the column will be sortable based on the compareFunction field  |
| compareFunction   | Function |  |           | Custom sort function that will be used when running sort operations  |

#### actions configuration
Each action should have atleast the two fields

| Property | Type     | Default | Required | Description |
| -------- | -------  | ------- | -------- | ----------- |
| name   | String | |     true     | Name of the action |
| action   | Function | |    true       | Function to be executed when the action runs, the selected entity is passed as a param to this function |

### slots
Flow has two slots

| SlotName | Props    | Description    |
| -------- | -------  | -------  |
| default-slot   |  | Default slot that's shwon on load |
| content-slot   | data | Slot shown when an items is selected with click/enter |

