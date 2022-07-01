import { NgModule } from '@angular/core';

import { KeysPipe } from './keys.pipe';
import { GetByIdPipe } from './getById.pipe';
import { HtmlToPlaintextPipe } from './htmlToPlaintext.pipe';
import { FilterPipe } from './filter.pipe';
import { CamelCaseToDashPipe } from './camelCaseToDash.pipe';
import { CurrencyPipe } from './currency.pipe';
import { DrpSearchPipe } from './drp-search.pipe';
import { FirstImgComaSepStringPipe } from './first-img-coma-sep-string.pipe';

@NgModule({
    declarations: [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        CurrencyPipe,
        DrpSearchPipe,
        FirstImgComaSepStringPipe
    ],
    imports     : [],
    exports     : [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        CurrencyPipe,
        DrpSearchPipe,
        FirstImgComaSepStringPipe
    ]
})
export class FusePipesModule
{
}
