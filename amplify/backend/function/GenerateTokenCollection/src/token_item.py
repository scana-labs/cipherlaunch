from __future__ import annotations
from itertools import combinations

import json
import logging
import random

from typing import Dict, List

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


class Token:
    def __init__(self, token_traits: Dict[str, str], token_images: List[str], token_trait_ids: List[str]) -> None:
        self.token_id = -1
        self.token_traits = token_traits
        self.token_images = token_images
        self.token_trait_ids = token_trait_ids

    @classmethod
    def random(cls, layer_trait_rarities, trait_names, trait_images) -> Token:
        token_trait_names = {}
        token_images = []
        token_trait_ids = []
        for layer, trait_rarities in layer_trait_rarities.items():
            traits = list(trait_rarities.keys())
            rarities = list(trait_rarities.values())
            if traits and rarities:
                token_trait_selection = {}
                chosen_trait_id = random.choices(traits, rarities)[0]
                token_trait_selection["trait_name"] = trait_names[chosen_trait_id]
                token_trait_selection["trait_id"] = chosen_trait_id
                token_trait_names[layer] = token_trait_selection
                image_url = trait_images[chosen_trait_id]
                if image_url is not None:
                    token_images.append(image_url)
                token_trait_ids.append(chosen_trait_id)
        return cls(token_trait_names, token_images, token_trait_ids)

    def incompatible(self, incompatible_traits: Dict[str, set(str)]) -> bool:
        trait_pairs = combinations(self.token_trait_ids, 2)

        # Check if (key, val) for each trait has incompatibilities as given by incompatible_traits.
        for trait_1, trait_2 in trait_pairs:
            if trait_1 not in incompatible_traits:
                continue
            elif trait_2 in incompatible_traits[trait_1]:
                logger.debug(f"Found incompatibility between trait {trait_1} and trait {trait_2}")
                return True
        return False

    def unrevealed_metadata(self, project_name, base_url) -> Dict:
        return {
            'image': f'{base_url}unrevealed.png',
            'name': f'{project_name} #{self.token_id}',
        }

    def metadata(self, project_name, base_url) -> Dict:
        attributes = []
        for layer, trait in self.token_traits.items():
            attributes.append({
                'trait_type': layer,
                'value': trait["trait_name"]
            })

        return {
            'image': f'{base_url}{self.token_id}.jpg',
            'name': f'{project_name} #{self.token_id}',
            'attributes': attributes,
        }

    def traits(self) -> Dict:
        return {
            **self.token_traits,
            'token_id': self.token_id
        }

    def __hash__(self) -> int:
        return hash(repr(self))

    def __eq__(self, o: object) -> bool:
        return repr(self) == repr(o)

    def __str__(self) -> str:
        return repr(self)

    def __repr__(self) -> str:
        return json.dumps(self.token_traits, sort_keys=True)
