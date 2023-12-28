import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootStateType} from 'app/store/store';

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector