from well_plate import WellPlate
import dash
from dash import Dash, callback, html, Input, Output

app = Dash(__name__)

# Set React version inside the app
dash._dash_renderer._set_react_version("18.2.0")

# Generate an array of well IDs (A1, A2, ..., H12) for 96 well-plate
well_ids_96 = []
for row in range(8):
    for col in range(1, 13):
        well_id = chr(65 + row) + str(col)
        well_ids_96.append(well_id)

# Generate an array of well IDs (A1, A2, ..., H12) for 96 well-plate
well_ids_384 = []
for row in range(16):
    for col in range(1, 25):
        well_id = chr(65 + row) + str(col)
        well_ids_384.append(well_id)

# Well Data
wells_data_96 = []
wells_data_384 = []

rows_96 = ["A", "B", "C", "D", "E", "F", "G", "H"]
columns_96 = [str(i) for i in range(1, 13)]
count = 0
for row in rows_96:
    for col in columns_96:
        well_id = row + col
        file_name = f"test {count}"
        count += 1
        wells_data_96.append(
            {"wellId": well_id, "fileName": file_name})

rows_384 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"]
columns_384 = [str(i) for i in range(1, 25)]
count = 0
for row in rows_384:
    for col in columns_384:
        well_id = row + col
        file_name = f"test {count}"
        count += 1
        wells_data_384.append(
            {"wellId": well_id, "fileName": file_name})

app.layout = html.Div([
    WellPlate(
        id='96-wellplate-component',
        WellsData=wells_data_96,
    ),
    WellPlate(
        id='384-wellplate-component',
        WellsData=wells_data_384,
    ),
])
#print(wells_data_384)
# @callback(Output('output-div', 'children'), [Input('my-test-component', 'value')])
# def display_output(value):
#     return 'You have entered {}'.format(value)


if __name__ == '__main__':
    app.run_server(debug=True)
