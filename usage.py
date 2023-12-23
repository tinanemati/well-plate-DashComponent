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

rows_384 = ["A", "B", "C", "D", "E", "F", "G",
            "H", "I", "J", "K", "L", "M", "N", "O", "P"]
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
    html.Div(id='96-wellplate-output'),
    WellPlate(
        id='96-wellplate-input',
        WellsData=wells_data_96,
        rows=8,
        columns=12,
        selectedWells=[]
    ),
    html.Div(id='384-wellplate-output'),
    WellPlate(
        id='384-wellplate-input',
        WellsData=wells_data_384,
        rows=16,
        columns=24,
        selectedWells=[]
    ),
])


@callback(Output('96-wellplate-output', 'children'), [Input('96-wellplate-input', 'selectedWells')])
def display_output(selectedWells):
    return f"You have selected the following wells in the 96 well-plate: {', '.join(selectedWells)}"


@callback(Output('384-wellplate-output', 'children'), [Input('384-wellplate-input', 'selectedWells')])
def display_output(selectedWells):
    return f"You have selected the following wells in the 384 well-plate: {', '.join(selectedWells)}"


if __name__ == '__main__':
    app.run_server(debug=True)
