<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241024091508 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        // $this->addSql('CREATE SEQUENCE brew_guide_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        // $this->addSql('CREATE SEQUENCE recipe_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        // $this->addSql('CREATE SEQUENCE scale_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        // $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        // $this->addSql('CREATE TABLE brew_guide (id INT NOT NULL, title VARCHAR(255) NOT NULL, description VARCHAR(1500) DEFAULT NULL, created_by INT NOT NULL, created_at TIME(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        // $this->addSql('CREATE TABLE recipe (id INT NOT NULL, name VARCHAR(255) NOT NULL, method INT DEFAULT NULL, temperature INT DEFAULT NULL, water_amt INT DEFAULT NULL, coffee_amt INT DEFAULT NULL, description VARCHAR(1500) DEFAULT NULL, created_by INT NOT NULL, created_at TIME(0) WITHOUT TIME ZONE DEFAULT NULL, modified_at TIME(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        // $this->addSql('CREATE TABLE scale (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        // $this->addSql('CREATE TABLE "user" (id INT NOT NULL, name VARCHAR(255) NOT NULL, mail VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, created_at TIME(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        // $this->addSql('CREATE SCHEMA public');
        // $this->addSql('DROP SEQUENCE brew_guide_id_seq CASCADE');
        // $this->addSql('DROP SEQUENCE recipe_id_seq CASCADE');
        // $this->addSql('DROP SEQUENCE scale_id_seq CASCADE');
        // $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        // $this->addSql('DROP TABLE brew_guide');
        // $this->addSql('DROP TABLE recipe');
        // $this->addSql('DROP TABLE scale');
        // $this->addSql('DROP TABLE "user"');
    }
}
