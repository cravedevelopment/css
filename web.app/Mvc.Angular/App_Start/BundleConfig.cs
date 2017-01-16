using System.Web.Optimization;

namespace CSS.MVC.Angular
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                  "~/Scripts/jquery/jquery-3.0.0.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/bundles/css").Include(
                "~/scripts/assets/components/bootstrap/dist/css/bootstrap.min.css",
                 "~/scripts/assets/components/rdash-ui/dist/css/rdash.min.css",
                 "~/scripts/assets/components/font-awesome/css/font-awesome.min.css",
                //"~/Content/bootstrap-responsive.min.css",
                //"~/Content/cssApp.css",
                //"~/Content/SortableGrid.css",
                "~/Content/angular-block-ui.min.css",

                "~/scripts/assets/components/rdash-ui/dist/fonts/"
                //"~/Content/css/style.css"
                //"~/Content/css/custom.css"
                ));

            // Angular
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular/angular.min.js",
                "~/Scripts/angular/angular-sanitize.min.js",
                "~/Scripts/angular-ui/angular-ui.min.js",
                "~/Scripts/angular-ui/ui-bootstrap.min.js",
                "~/Scripts/angular-ui/ui-bootstrap-tpls.min.js",
                "~/Scripts/angular-ui/angular-ui.min.js",
                "~/Scripts/angular/angular-ui-router.min.js",
                "~/Scripts/angular-ui/angular-block-ui.js",
                "~/Scripts/angular-ui/uploader.min.js",
                "~/scripts/assets/components/angular-cookies/angular-cookies.min.js"
               ));

            // RDash
            bundles.Add(new ScriptBundle("~/bundles/rdash").Include(
               
                "~/scripts/assets/js/module.js",
                "~/scripts/assets/js/routes.js",
                "~/scripts/assets/js/controllers/master-ctrl.js",
                "~/scripts/assets/js/controllers/alert-ctrl.js",
                "~/scripts/assets/js/directives/loading.js",
                "~/scripts/assets/js/directives/widget-header.js",
                "~/scripts/assets/js/directives/widget-body.js",
                "~/scripts/assets/js/directives/widget-footer.js",
                "~/scripts/assets/js/directives/widget.js"
                ));

            // Shared 
            bundles.Add(new ScriptBundle("~/bundles/shared").Include(
                "~/Scripts/app/cssApp.js", 
                //"~/Scripts/app/cssBootstrap.js",
                "~/Scripts/app/Shared/alertService.js",
                "~/Scripts/app/Shared/dataGridService.js", 
                "~/Scripts/app/cssAppController.js", 
                "~/Scripts/app/Shared/dateService.js", 
                "~/Scripts/app/Shared/cssModuleService.js"
            ));
            bundles.Add(new ScriptBundle("~/bundles/home").Include(
                "~/Scripts/app/Home/indexController.js"
            ));
            bundles.Add(new ScriptBundle("~/bundles/accounts").Include(
                "~/Scripts/app/BankAccount/bankAccountController.js", 
                "~/Scripts/app/BankAccount/bankAccountCreateController.js",
                "~/Scripts/app/BankAccount/bankAccountEditController.js",
                "~/Scripts/app/BankAccount/bankAccountService.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/transactions").Include(
                "~/Scripts/app/BankTransaction/uploaderController.js",
                "~/Scripts/app/BankTransaction/uploaderService.js", 
                "~/Scripts/app/BankTransaction/bankTransactionController.js",
                "~/Scripts/app/BankTransaction/bankTransactionEditController.js", 
                "~/Scripts/app/BankTransaction/bankTransactionService.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/banks").Include(
                "~/Scripts/app/Bank/bankController.js", 
                "~/Scripts/app/Bank/bankEditController.js",
                "~/Scripts/app/Bank/bankCreateController.js",
                "~/Scripts/app/Bank/bankService.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/transferInstructions").Include(
               "~/Scripts/app/BankTransferInstruction/bankTransferInstructionController.js",
               "~/Scripts/app/BankTransferInstruction/bankTransferInstructionCreateController.js",
               "~/Scripts/app/BankTransferInstruction/bankTransferInstructionEditController.js",
               "~/Scripts/app/BankTransferInstruction/bankTranserInstructionService.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/depositInstructions").Include(
                "~/Scripts/app/BankDepositInstruction/bankDepositInstructionController.js",
               "~/Scripts/app/BankDepositInstruction/bankDepositInstructionCreateController.js",
               "~/Scripts/app/BankDepositInstruction/bankDepositInstructionEditController.js",
               "~/Scripts/app/BankDepositInstruction/bankDepositInstructionService.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/chequemonitoring").Include(
               "~/Scripts/app/ChequeMonitoring/chequeMonitoringController.js",
               "~/Scripts/app/ChequeMonitoring/chequeMonitoringCreateController.js",
                "~/Scripts/app/ChequeMonitoring/chequeMonitoringEditController.js",
                "~/Scripts/app/ChequeMonitoring/chequeMonitoringService.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/users").Include(
               "~/Scripts/app/User/usersController.js", 
               "~/Scripts/app/User/userCreateController.js",
               "~/Scripts/app/User/userEditController.js", 
               "~/Scripts/app/User/userService.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/roles").Include("~/Scripts/app/Role/roleService.js"));
        }
    }
}
