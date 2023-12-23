# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class WellPlate(Component):
    """A WellPlate component.
WellPlate component that allow the user to select wells
in a generic well plate

Keyword arguments:

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- WellsData (list; required):
    The data used to redner plate.

- columns (number; required):
    The number used to identify the number of columns in the plate.

- rows (number; required):
    The number used to identify the number of rows in the plate.

- selectedWells (list; required):
    The selected well in plate by user."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'well_plate'
    _type = 'WellPlate'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, WellsData=Component.REQUIRED, rows=Component.REQUIRED, columns=Component.REQUIRED, selectedWells=Component.REQUIRED, **kwargs):
        self._prop_names = ['id', 'WellsData', 'columns', 'rows', 'selectedWells']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'WellsData', 'columns', 'rows', 'selectedWells']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['WellsData', 'columns', 'rows', 'selectedWells']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(WellPlate, self).__init__(**args)
