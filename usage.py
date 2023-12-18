import well_plate
from dash import Dash, callback, html, Input, Output

app = Dash(__name__)

# Set React version inside the app
Dash._dash_renderer._set_react_version("18.2.0")

app.layout = html.Div([
    well_plate.WellPlate(
        id='input',
        value='my-value',
        label='my-label'
    ),
    html.Div(id='output')
])


@callback(Output('output', 'children'), Input('input', 'value'))
def display_output(value):
    return 'You have entered {}'.format(value)


if __name__ == '__main__':
    app.run_server(debug=True)
