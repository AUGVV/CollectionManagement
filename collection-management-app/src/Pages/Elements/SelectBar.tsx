import { forwardRef, useCallback } from "react";

import SelectBarStyle from "./StyledComponents/SelectBar.tsx/SelectBarStyle";
import TypeItemsModel from "../../Models/TypeItemsModel";

type Props = {
    typesList: TypeItemsModel[],
    handleTypeChange: () => Promise<void> | undefined,
};

const PaginatedCollections = forwardRef((props: Props, ref: any) => {
    const handleTypeChange = useCallback(async () => {
        if (props.handleTypeChange !== undefined) {
            await props.handleTypeChange();
        }
    }, [props])

    return (
        <SelectBarStyle
            onChange={handleTypeChange}
            ref={ref}
            required>
            <option selected value={undefined}>none</option>
            {props.typesList.map((item) => (
                <option value={item.id}>{item.name}</option>
            ))}
        </SelectBarStyle>);
})

export default PaginatedCollections;
