/// <reference types="cypress" />
const fs = require("fs");

describe("Scrape and download TCGA gene expression files from Xena Browser", () => {
  const cohorts = [
    "TCGA Acute Myeloid Leukemia (LAML)",
    "TCGA Adrenocortical Cancer (ACC)",
    "TCGA Bile Duct Cancer (CHOL)",
    "TCGA Bladder Cancer (BLCA)",
    "TCGA Breast Cancer (BRCA)",
    "TCGA Cervical Cancer (CESC)",
    "TCGA Colon and Rectal Cancer (COADREAD)",
    "TCGA Colon Cancer (COAD)",
    "TCGA Endometrioid Cancer (UCEC)",
    "TCGA Esophageal Cancer (ESCA)",
    "TCGA Formalin Fixed Paraffin-Embedded Pilot Phase II (FPPP)",
    "TCGA Glioblastoma (GBM)",
    "TCGA Head and Neck Cancer (HNSC)",
    "TCGA Kidney Chromophobe (KICH)",
    "TCGA Kidney Clear Cell Carcinoma (KIRC)",
    "TCGA Kidney Papillary Cell Carcinoma (KIRP)",
    "TCGA Large B-cell Lymphoma (DLBC)",
    "TCGA Liver Cancer (LIHC)",
    "TCGA Lower Grade Glioma (LGG)",
    "TCGA lower grade glioma and glioblastoma (GBMLGG)",
    "TCGA Lung Adenocarcinoma (LUAD)",
    "TCGA Lung Cancer (LUNG)",
    "TCGA Lung Squamous Cell Carcinoma (LUSC)",
    "TCGA Melanoma (SKCM)",
    "TCGA Mesothelioma (MESO)",
    "TCGA Ocular melanomas (UVM)",
    "TCGA Ovarian Cancer (OV)",
    "TCGA Pan-Cancer (PANCAN)",
    "TCGA Pancreatic Cancer (PAAD)",
    "TCGA Pheochromocytoma & Paraganglioma (PCPG)",
    "TCGA Prostate Cancer (PRAD)",
    "TCGA Rectal Cancer (READ)",
    "TCGA Sarcoma (SARC)",
    "TCGA Stomach Cancer (STAD)",
    "TCGA Testicular Cancer (TGCT)",
    "TCGA Thymoma (THYM)",
    "TCGA Thyroid Cancer (THCA)",
    "TCGA Uterine Carcinosarcoma (UCS)",
  ];

  cohorts.forEach((cohort) => {
    it(`Find and download file for ${cohort}`, () => {
      const filename = `${cohort.replace(/\s+/g, "_")}.tsv.gz`;
      const filePath = `cypress/downloads/${filename}`;

      cy.task("fileExists", filePath).then((fileExists) => {
        if (fileExists) {
          cy.log(`${filename} already exists, skipping download.`);
        } else {
          cy.visit(
            "https://xenabrowser.net/datapages/?hub=https://tcga.xenahubs.net:443"
          );

          cy.wait(5000);

          cy.contains(cohort).scrollIntoView().click();

          cy.wait(5000);

          cy.contains("IlluminaHiSeq pancan normalized")
            .scrollIntoView()
            .click();

          cy.wait(5000);

          cy.get("a")
            .contains("download")
            .invoke("attr", "href")
            .then((downloadUrl) => {
              if (downloadUrl) {
                cy.log(`Downloading file from: ${downloadUrl}`);

                cy.exec(`curl -o ${filePath} ${downloadUrl}`).then((result) => {
                  cy.log(`Downloaded: ${filename}`);
                });
              } else {
                cy.log("Download link not found");
              }
            });
        }
      });
    });
  });
});
