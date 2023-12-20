# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class WellPlate(Component):
    """A WellPlate component.
WellPlate component that allow the user to select wells 
in a generic well plate

Keyword arguments:

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- WellsData (list; optional):
    The data used to redner plate."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'well_plate'
    _type = 'WellPlate'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, WellsData=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'WellsData']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'WellsData']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(WellPlate, self).__init__(**args)
