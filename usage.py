from well_plate import WellPlate
import dash
from dash import Dash, callback, html, Input, Output

app = Dash(__name__)

# Set React version inside the app
dash._dash_renderer._set_react_version("18.2.0")

# Generate an array of well IDs (A1, A2, ..., H12)
well_ids = []
for row in range(8):
    for col in range(1, 13):
        well_id = chr(65 + row) + str(col)
        well_ids.append(well_id)

# Well Data
wells_data = []


rows = ["A", "B", "C", "D", "E", "F", "G", "H"]
columns = [str(i) for i in range(1, 13)]
count = 0
for row in rows:
    for col in columns:
        well_id = row + col
        file_name = f"test {count}"
        count += 1
        wells_data.append(
            {"wellId": well_id, "fileName": file_name})

app.layout = html.Div([
    WellPlate(
        id='my-wellplate-component',
        WellsData=wells_data,
    ),
    html.Div(id='output-div')
])


# @callback(Output('output-div', 'children'), [Input('my-test-component', 'value')])
# def display_output(value):
#     return 'You have entered {}'.format(value)


if __name__ == '__main__':
    app.run_server(debug=True)
