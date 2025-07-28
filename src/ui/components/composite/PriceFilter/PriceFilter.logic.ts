import { useFiltersState } from "@/src/ui/state/filters";
import { useEffect, useState } from "react";

export const usePriceFilterLogic = () => {
    const { filtersActions, filtersSelectors } = useFiltersState();

    const appliedMinPrice = filtersSelectors.minPrice();
    const appliedMaxPrice = filtersSelectors.maxPrice();

    const [minPrice, setMinPrice] = useState<string>(appliedMinPrice);
    const [maxPrice, setMaxPrice] = useState<string>(appliedMaxPrice);
    const [minPriceError, setMinPriceError] = useState<boolean>(false);
    const [maxPriceError, setMaxPriceError] = useState<boolean>(false);

    const handleMinPriceChange = (value: string) => {
        if (/^\d*$/.test(value)) {
            setMinPrice(value);
            filtersActions.setMinPrice(value);
        }
    };

    const handleMaxPriceChange = (value: string) => {
        if (/^\d*$/.test(value)) {
            setMaxPrice(value);
            filtersActions.setMaxPrice(value);
        }
    };

    useEffect(() => {
        if (Number(minPrice) > Number(maxPrice)) {
            setMinPriceError(true);
            filtersActions.setIsPriceFilterError(true);
        } else {
            setMinPriceError(false);
            filtersActions.setIsPriceFilterError(false);
        }

        if (Number(maxPrice) < Number(minPrice)) {
            setMaxPriceError(true);
            filtersActions.setIsPriceFilterError(true);
        } else {
            setMaxPriceError(false);
            filtersActions.setIsPriceFilterError(false);
        }
    }, [minPrice, maxPrice]);

    return {
        minPrice,
        maxPrice,
        handleMinPriceChange,
        handleMaxPriceChange,
        minPriceError,
        maxPriceError,
    };
};