from dash.testing.application_runners import import_app

# Test for checking selectedWells output based on WellPlate interaction.
def test_wellplate_output(dash_duo):
    # Start a dash app contained as the variable `app` in `usage.py`
    app = import_app('usage')
    dash_duo.start_server(app)

    # Simulate interaction with the 96-wellplate-input component
    dash_duo.click('#96-wellplate-input > .well')  # Simulate a click on a well in the 96-wellplate

    # Check if the selectedWells output is as expected
    expected_output = "You have selected the following wells in the 96 well-plate: A1"  # Change this according to your test
    dash_duo.wait_for_text_to_equal('#96-wellplate-output', expected_output)
