from well_plate import MyTextInput
import dash
from dash import Dash, callback, html, Input, Output

app = Dash(__name__)

# Set React version inside the app
dash._dash_renderer._set_react_version("18.2.0")

app.layout = html.Div([
    MyTextInput(
        id='my-test-component',
        value='A custom text input',
        label=''
    ),
    html.Div(id='output-div')
])


@callback(Output('output-div', 'children'), [Input('my-test-component', 'value')])
def display_output(value):
    return 'You have entered {}'.format(value)


if __name__ == '__main__':
    app.run_server(debug=True)
