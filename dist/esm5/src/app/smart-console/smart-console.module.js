import * as tslib_1 from "tslib";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartConsoleService } from './smart-console.service';
var SmartConsoleModule = /** @class */ (function () {
    function SmartConsoleModule() {
    }
    SmartConsoleModule_1 = SmartConsoleModule;
    SmartConsoleModule.forRoot = function () {
        return {
            ngModule: SmartConsoleModule_1,
            providers: [
                SmartConsoleService
            ]
        };
    };
    var SmartConsoleModule_1;
    SmartConsoleModule = SmartConsoleModule_1 = tslib_1.__decorate([
        NgModule({
            declarations: [],
            exports: [],
            imports: [CommonModule],
            providers: [SmartConsoleService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
    ], SmartConsoleModule);
    return SmartConsoleModule;
}());
export { SmartConsoleModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnQtY29uc29sZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvc21hcnQtY29uc29sZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc21hcnQtY29uc29sZS9zbWFydC1jb25zb2xlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBUzlEO0lBQUE7SUFTQSxDQUFDOzJCQVRZLGtCQUFrQjtJQUN0QiwwQkFBTyxHQUFkO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSxvQkFBa0I7WUFDNUIsU0FBUyxFQUFFO2dCQUNULG1CQUFtQjthQUNwQjtTQUNGLENBQUE7SUFDSCxDQUFDOztJQVJVLGtCQUFrQjtRQVA5QixRQUFRLENBQUM7WUFDUixZQUFZLEVBQUUsRUFBRTtZQUNoQixPQUFPLEVBQUUsRUFBRTtZQUNYLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztZQUNoQyxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUNsQyxDQUFDO09BQ1csa0JBQWtCLENBUzlCO0lBQUQseUJBQUM7Q0FBQSxBQVRELElBU0M7U0FUWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgU21hcnRDb25zb2xlU2VydmljZSB9IGZyb20gJy4vc21hcnQtY29uc29sZS5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgZXhwb3J0czogW10sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtTbWFydENvbnNvbGVTZXJ2aWNlXSxcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIFNtYXJ0Q29uc29sZU1vZHVsZSB7IFxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNtYXJ0Q29uc29sZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBTbWFydENvbnNvbGVTZXJ2aWNlXG4gICAgICBdXG4gICAgfVxuICB9XG59XG4iXX0=